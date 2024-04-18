# todo_api - API

## Overview

Welcome to the backend API for todo. This API is built using NestJS, a powerful and extensible Node.js framework. It provides a solid foundation for building scalable and maintainable server-side applications.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
  - [Running the Server](#running-the-server)
- [Testing](#testing)

## Getting Started

## Prerequisites

Before you begin with the NestJS project, ensure you have the following prerequisites installed:

1. **Node.js and npm**: NestJS is built on top of Node.js, so you need to have Node.js installed. npm, the Node.js package manager, is used to manage dependencies.

   - [Node.js](https://nodejs.org/)
   - [npm](https://www.npmjs.com/)

   Make sure to install a version that is compatible with NestJS

2. **Database**:

   - [PostgreSQL](https://www.postgresql.org/)

3. **NestJS CLI**: The NestJS Command Line Interface (CLI) is a powerful tool for scaffolding and managing NestJS projects. Install it globally using the following command:
   ```bash
   npm install -g @nestjs/cli
   ```

## Installation

Follow these steps to set up the NestJS project on your local machine:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/bbazina/simple_todo.git
   navigate to folder cd simple_todo
   npm install
   ```

## Configuration

Before running the NestJS application, make sure to configure the necessary settings. This usually involves setting up environment variables and adjusting configuration files.

1. **Copy Configuration File:**
   Copy the `.env.example` file in the project root to create a new `.env` file.
   ```bash
   cp .env.example .env
   ```

### Running the Server

```bash
npm run start
```

## Testing

```bash
npm run test
```
