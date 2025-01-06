import { defineConfig } from "vitest/config";

export default defineConfig(() => ({
    test: {
        server: {
            deps: {
                inline: ["@fastify/autoload"],
            },
        },
        coverage: {
            enabled: true,
            include: ["src/**/*.ts"], // Include only relevant source files
            exclude: [
                "dist/**", // Compiled files
                "migrations/**",
                "tests/**", // Exclude test files themselves
                "*.config.*", // Config files
                "*.js", // Ignore JavaScript files
            ],
            lines: 90,
            functions: 90,
            branches: 90,
            statements: 90,
            reporter: ["lcov", "text"],
        },
        alias: {
            "entities": "/src/entities",
        },
        include: ["tests/**/*.test.ts"], // Only test files in the `tests` directory
        environment: "node",
    },
}));
