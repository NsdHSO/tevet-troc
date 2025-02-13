# Home

This library was generated with [Nx](https://nx.dev).

## Description

This library is an automatically generated Fastify plugin that integrates into the existing backend structure.
When you run the entity generator, it performs the following tasks:

✅ **Creates a new Nx library** under `libs/bus/home/`
✅ **Adds project configuration** to the workspace
✅ **Generates base files**, including `index.ts`, `README.md`, and necessary folder structures
✅ **Updates TypeScript paths** in `tsconfig.base.json`
✅ **Registers the new entity plugin** inside `apps/tevet-troc/src/app/app.ts`
✅ **Ensures proper formatting** and consistency

---

## **Generated Structure**

When an entity is created, the following structure is generated:

```md
libs/bus/home/
├── src/
│ ├── index.ts # Exports the plugin
│ ├── lib/
│ │ ├── infrastructure/
│ │ │ ├── services/ # Business logic services
│ │ │ │ ├── example.service.ts
│ │ │ │ ├── ...
│ │ │ ├── database/ # Database models and repositories
│ │ │ │ ├── entity.model.ts
│ │ │ │ ├── entity.repository.ts
│ │ │ │ ├── ...
│ │ │ ├── http/
│ │ │ │ ├── routes/ # API routes for this entity
│ │ │ │ │ ├── example.route.ts
│ │ │ │ │ ├── ...
│ │ │ │ ├── controllers/ # Controllers handling requests
│ │ │ │ │ ├── example.controller.ts
│ │ │ │ │ ├── ...
│ │ │ │ ├── schemas/ # Request/Response validation schemas
│ │ │ │ │ ├── example.schema.ts
│ │ │ │ │ ├── ...
│ │ │ ├── config.ts # Configuration for the module
│ │ ├── example.plugin.ts # Plugin for integrating into Fastify
├── README.md # This documentation
├── tsconfig.lib.json # TypeScript configuration
└── project.json # Nx project configuration
```
