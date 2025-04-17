import { Injectable, Logger } from '@nestjs/common';
import {
  AmbulanceEntity,
  AmbulanceStatus,
  EmergencyEntity,
  EmergencyStatus,
} from '@app/models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class EmergencyAllocationService {
  private readonly _loggerService = new Logger(EmergencyAllocationService.name);
  /* Flag to track if allocation process is running
   */
  private _isProcessRunning = false;

  constructor(
    @InjectRepository(EmergencyEntity)
    private _emergencyRepository: Repository<EmergencyEntity>,
    @InjectRepository(AmbulanceEntity)
    private _ambulanceRepository: Repository<AmbulanceEntity>,
  ) {}

  /**
   * Runs every minute to check for unassigned emergencies and allocate them to available ambulances
   */
  @Cron(CronExpression.EVERY_2ND_HOUR)
  async allocateEmergenciesToAmbulances() {
    // Check if process is already running
    if (this._isProcessRunning) {
      this._loggerService.warn(
        'Emergency allocation process is already running, skipping this execution',
      );
      return;
    }
    try {
      // Set lock
      this._isProcessRunning = true;
      this._loggerService.log('Starting emergency allocation process');

      // Find all pending emergencies without an ambulance assigned
      const pendingEmergencies = await this._emergencyRepository.find({
        where: {
          status: EmergencyStatus.PENDING,
          ambulance: undefined,
        },
        order: {
          // Sort by severity and creation date
          severity: 'DESC',
          createdAt: 'ASC',
        },
      });

      if (pendingEmergencies.length === 0) {
        this._loggerService.log('No pending emergencies found for allocation');
        return;
      }

      this._loggerService.log(
        `Found ${pendingEmergencies.length} pending emergencies for allocation`,
      );

      // Find all available ambulances
      const availableAmbulances = await this._ambulanceRepository.find({
        where: { status: AmbulanceStatus.AVAILABLE },
      });

      if (availableAmbulances.length === 0) {
        this._loggerService.warn(
          'No available ambulances found for allocation',
        );
        return;
      }

      this._loggerService.log(
        `Found ${availableAmbulances.length} available ambulances`,
      );

      // Allocate emergencies to ambulances based on proximity or other criteria
      for (const emergency of pendingEmergencies) {
        // Skip if no more ambulances are available
        if (availableAmbulances.length === 0) break;

        // Find the closest ambulance (this is a simplified example)
        const closestAmbulanceIndex = this.findClosestAmbulanceIndex(
          emergency.location,
          availableAmbulances,
        );

        if (closestAmbulanceIndex !== -1) {
          const ambulance = availableAmbulances[closestAmbulanceIndex];

          // Fetch fresh copy of the emergency to work with
          const freshEmergency = await this._emergencyRepository.findOne({
            where: { id: emergency.id },
          });

          if (!freshEmergency) {
            this._loggerService.warn(
              `Emergency ${emergency.id} no longer exists`,
            );
            continue;
          }

          // Update the emergency entity
          freshEmergency.status = EmergencyStatus.IN_PROGRESS;

          // Record the modification attempt
          freshEmergency.recordModificationAttempt({
            action: 'AMBULANCE_ASSIGNED',
            ambulanceId: ambulance.id,
            previousStatus: emergency.status,
            note: 'CRON - Automate',
          });

          // Set the ambulance relation
          freshEmergency.ambulance = ambulance;

          // Save the updated emergency
          await this._emergencyRepository.save(freshEmergency);

          // Mark the ambulance as unavailable
          await this._ambulanceRepository.update(
            { id: ambulance.id },
            { status: AmbulanceStatus.DISPATCHED },
          );

          // Remove this ambulance from the available list
          availableAmbulances.splice(closestAmbulanceIndex, 1);

          this._loggerService.log(
            `Assigned ambulance ${ambulance.id} to emergency ${emergency.id} (${emergency.emergencyIc})`,
          );
        }
      }
      this._loggerService.log('Emergency allocation process completed');
    } catch (error) {
      this._loggerService.error(
        `Error during emergency allocation: ${JSON.stringify(error)}`,
      );
    } finally {
      // Make sure to release the lock even if there's an error
      this._isProcessRunning = false;
    }
  }

  /**
   * Finds the index of the closest ambulance to the emergency location
   * This is a simplified example - in a real system you might use more complex
   * proximity calculations or even integrate with a mapping service
   */
  private findClosestAmbulanceIndex(
    emergencyLocation: { latitude: number; longitude: number },
    ambulances: AmbulanceEntity[],
  ): number {
    if (!ambulances.length) return -1;

    let closestIndex = 0;
    let shortestDistance = this.calculateDistance(
      emergencyLocation,
      ambulances[0].location,
    );

    for (let i = 1; i < ambulances.length; i++) {
      const distance = this.calculateDistance(
        emergencyLocation,
        ambulances[i].location,
      );

      if (distance < shortestDistance) {
        shortestDistance = distance;
        closestIndex = i;
      }
    }

    return closestIndex;
  }

  /**
   * Calculates the distance between two geo points using the Haversine formula
   */
  private calculateDistance(
    point1: { latitude: number; longitude: number },
    point2: { latitude: number; longitude: number },
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRadians(point2.latitude - point1.latitude);
    const dLon = this.toRadians(point2.longitude - point1.longitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(point1.latitude)) *
        Math.cos(this.toRadians(point2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Manual trigger for emergency allocation (can be called from an API endpoint)
   */
  async manuallyAllocateEmergencies() {
    return this.allocateEmergenciesToAmbulances();
  }

  /**
   * Check if the allocation process is currently running
   */
  isAllocationProcessRunning(): boolean {
    return this._isProcessRunning;
  }
}
