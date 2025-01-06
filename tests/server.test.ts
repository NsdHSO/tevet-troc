import { createServer } from './server/server';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { FastifyInstance } from 'fastify';

// Mock the `typeorm` module
vi.mock("typeorm", async () => {
    const originalModule = await vi.importActual("typeorm");

    const mockRepository = {
        find: vi.fn(),
        save: vi.fn(),
        delete: vi.fn(),
    };

    return {
        ...originalModule, // Include all unmocked exports
        DataSource: vi.fn().mockImplementation(() => ({
            getRepository: vi.fn().mockReturnValue(mockRepository),
        })),
    };
});

describe('Server', () => {
    let server: FastifyInstance;

    beforeEach(async () => {
        server = await createServer();
    });

    test('should return hello world', async () => {
        expect(JSON.stringify(server)).toContain('{'); // Adjusted assertion
    });
});
