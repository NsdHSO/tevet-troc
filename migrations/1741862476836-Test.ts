import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1741862476836 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.query(`CREATE TYPE "public"."bill_status_enum" AS ENUM('pending', 'paid', 'overdue')`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "status" "public"."bill_status_enum" NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`CREATE TYPE "public"."department_name_enum" AS ENUM('Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology', 'Emergency', 'Radiology', 'Pathology', 'Dermatology', 'Psychiatry')`);
        await queryRunner.query(`ALTER TABLE "department" ADD "name" "public"."department_name_enum" NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."room_type_enum" AS ENUM('Single', 'Double', 'Suite', 'ICU', 'Operating')`);
        await queryRunner.query(`ALTER TABLE "room" ADD "type" "public"."room_type_enum" NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."bed_type_enum" AS ENUM('Standard', 'ICU', 'Pediatric')`);
        await queryRunner.query(`ALTER TABLE "bed" ADD "type" "public"."bed_type_enum" NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."amenities_name_enum" AS ENUM('TV', 'WiFi', 'Private Bathroom', 'Refrigerator', 'Phone')`);
        await queryRunner.query(`ALTER TABLE "amenities" ADD "name" "public"."amenities_name_enum" NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."staff_role_enum" AS ENUM('Doctor', 'Nurse', 'Surgeon', 'Technician', 'Administrator', 'Receptionist', 'Pharmacist')`);
        await queryRunner.query(`ALTER TABLE "staff" ADD "role" "public"."staff_role_enum" NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."guard_shift_enum" AS ENUM('Morning', 'Afternoon', 'Night')`);
        await queryRunner.query(`ALTER TABLE "guard" ADD "shift" "public"."guard_shift_enum" NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."guard_area_enum" AS ENUM('Entrance', 'Emergency', 'Parking', 'Ward')`);
        await queryRunner.query(`ALTER TABLE "guard" ADD "area" "public"."guard_area_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "allergies" text`);
        await queryRunner.query(`CREATE TYPE "public"."appointment_status_enum" AS ENUM('Scheduled', 'Completed', 'Cancelled')`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "status" "public"."appointment_status_enum" NOT NULL DEFAULT 'Scheduled'`);
        await queryRunner.query(`CREATE TYPE "public"."prescription_order_status_enum" AS ENUM('Ordered', 'Dispensed', 'Cancelled')`);
        await queryRunner.query(`ALTER TABLE "prescription_order" ADD "status" "public"."prescription_order_status_enum" NOT NULL DEFAULT 'Ordered'`);
        await queryRunner.query(`CREATE TYPE "public"."ambulance_type_enum" AS ENUM('Basic', 'Advanced', 'Critical Care')`);
        await queryRunner.query(`ALTER TABLE "ambulance" ADD "type" "public"."ambulance_type_enum" NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."ambulance_status_enum" AS ENUM('Available', 'In Transit', 'Unavailable')`);
        await queryRunner.query(`ALTER TABLE "ambulance" ADD "status" "public"."ambulance_status_enum" NOT NULL DEFAULT 'Available'`);
        await queryRunner.query(`CREATE TYPE "public"."ambulance_cardetailsmodel_enum" AS ENUM('Sprinter', 'Transit', 'Econoline')`);
        await queryRunner.query(`ALTER TABLE "ambulance" ADD "carDetailsModel" "public"."ambulance_cardetailsmodel_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."ambulance_cardetailsmake_enum" AS ENUM('Mercedes', 'Ford', 'Chevrolet')`);
        await queryRunner.query(`ALTER TABLE "ambulance" ADD "carDetailsMake" "public"."ambulance_cardetailsmake_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."emergency_status_enum" AS ENUM('Pending', 'In Progress', 'Resolved')`);
        await queryRunner.query(`ALTER TABLE "emergency" ADD "status" "public"."emergency_status_enum" NOT NULL DEFAULT 'Pending'`);
        await queryRunner.query(`CREATE TYPE "public"."emergency_severity_enum" AS ENUM('Low', 'Medium', 'High', 'Critical')`);
        await queryRunner.query(`ALTER TABLE "emergency" ADD "severity" "public"."emergency_severity_enum" NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."emergency_incidenttype_enum" AS ENUM('Accident', 'Heart Attack', 'Stroke', 'Fall', 'Burn', 'Overdose')`);
        await queryRunner.query(`ALTER TABLE "emergency" ADD "incidentType" "public"."emergency_incidenttype_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "emergency" DROP COLUMN "incidentType"`);
        await queryRunner.query(`DROP TYPE "public"."emergency_incidenttype_enum"`);
        await queryRunner.query(`ALTER TABLE "emergency" DROP COLUMN "severity"`);
        await queryRunner.query(`DROP TYPE "public"."emergency_severity_enum"`);
        await queryRunner.query(`ALTER TABLE "emergency" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."emergency_status_enum"`);
        await queryRunner.query(`ALTER TABLE "ambulance" DROP COLUMN "carDetailsMake"`);
        await queryRunner.query(`DROP TYPE "public"."ambulance_cardetailsmake_enum"`);
        await queryRunner.query(`ALTER TABLE "ambulance" DROP COLUMN "carDetailsModel"`);
        await queryRunner.query(`DROP TYPE "public"."ambulance_cardetailsmodel_enum"`);
        await queryRunner.query(`ALTER TABLE "ambulance" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."ambulance_status_enum"`);
        await queryRunner.query(`ALTER TABLE "ambulance" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."ambulance_type_enum"`);
        await queryRunner.query(`ALTER TABLE "prescription_order" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."prescription_order_status_enum"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."appointment_status_enum"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "allergies"`);
        await queryRunner.query(`ALTER TABLE "guard" DROP COLUMN "area"`);
        await queryRunner.query(`DROP TYPE "public"."guard_area_enum"`);
        await queryRunner.query(`ALTER TABLE "guard" DROP COLUMN "shift"`);
        await queryRunner.query(`DROP TYPE "public"."guard_shift_enum"`);
        await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."staff_role_enum"`);
        await queryRunner.query(`ALTER TABLE "amenities" DROP COLUMN "name"`);
        await queryRunner.query(`DROP TYPE "public"."amenities_name_enum"`);
        await queryRunner.query(`ALTER TABLE "bed" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."bed_type_enum"`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."room_type_enum"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "name"`);
        await queryRunner.query(`DROP TYPE "public"."department_name_enum"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."bill_status_enum"`);
    }

}