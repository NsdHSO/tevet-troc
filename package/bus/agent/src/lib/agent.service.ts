import { Injectable } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

@Injectable()
export class AgentService {
  create(createAgentDto: CreateAgentDto) {
    return 'This action adds a new Agent';
  }

  findAll() {
    return `This action returns all Agent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} Agent`;
  }

  update(id: number, updateAgentDto: UpdateAgentDto) {
    return `This action updates a #${id} Agent`;
  }

  remove(id: number) {
    return `This action removes a #${id} Agent`;
  }
}
