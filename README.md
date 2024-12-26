# 2048 Game - Docker Setup

## Prerequisites
- Docker
- Docker Compose

## Running the Application
1. Clone this repository
2. Navigate to the project directory
3. Run the following command:

```bash
docker-compose up --build
```

4. Open your browser and navigate to `http://localhost:5565`

## Stopping the Application
```bash
docker-compose down
```

## GitHub Actions
This repository includes two GitHub Actions workflows:

1. **Continuous Integration (CI)**: 
   - Lints HTML, CSS, and JavaScript files
   - Runs on pushes and pull requests to `main` and `master` branches

2. **Docker Image Build and Publish**:
   - Builds Docker image
   - Publishes to GitHub Container Registry
   - Triggered on pushes, tags, and pull requests to `main` and `master` branches

### Workflow Details
- **CI Workflow**: Uses `htmlhint`, `stylelint`, and `eslint` for code quality checks
- **Docker Workflow**: 
  - Uses Docker Buildx for multi-platform builds
  - Publishes images to GitHub Container Registry
  - Supports versioned and branch-based tags
