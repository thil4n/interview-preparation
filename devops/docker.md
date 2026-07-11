# What is Docker and why is it used?

Docker is a platform for developing, shipping, and running applications in containers. Containers package an application with its dependencies, ensuring consistency across environments. Docker simplifies:

Application deployment

Environment management

Scalability

Isolation

# What is the difference between a container and a virtual machine?

Containers share the host OS kernel and run as isolated processes. They are lightweight and start quickly.

VMs include a full OS with their own kernel, making them heavier and slower to boot.

Containers are more efficient in terms of resource usage compared to VMs.

# What is a Dockerfile?

A Dockerfile is a script containing a set of instructions to build a Docker image. Common commands include:

FROM – Base image

RUN – Execute a command

COPY / ADD – Copy files into the image

CMD / ENTRYPOINT – Define default container behavior

# What is the difference between CMD and ENTRYPOINT in a Dockerfile?

CMD provides default arguments for the container but can be overridden.

ENTRYPOINT defines the main command to run and is not easily overridden.
They can be combined for flexible and controlled execution.

# How does Docker networking work?

Docker provides several network drivers:

bridge (default) – containers on the same host can communicate

host – shares the host’s network stack

overlay – used in Docker Swarm for multi-host communication

none – disables networking

You can also create custom user-defined bridges for container communication by name.

# What is the difference between an image and a container?

Image: A read-only template used to create containers.

Container: A runnable instance of an image, which is isolated and can have its own file system and processes.

# How do you manage data in Docker containers?

Use volumes and bind mounts:

Volumes are managed by Docker and stored in a special location (/var/lib/docker/volumes).

Bind mounts map directories from the host system into the container.
They help in persisting data and sharing between containers.

# What is a multi-stage build in Docker?

Multi-stage builds allow you to use multiple FROM statements to build and copy only the necessary artifacts into the final image.
This reduces the image size and separates build dependencies from runtime.

# How do you reduce the size of a Docker image?

Use minimal base images (like alpine)

Remove unnecessary files after installation

Combine RUN statements to reduce layers

Use .dockerignore to exclude files from the build context

Apply multi-stage builds

# How do you update a running Docker container?

You can’t directly update a running container. Instead:

Stop and remove the old container

Build or pull a new image

Run a new container with the updated image
Docker containers are meant to be immutable and replaced, not patched.

# What are Docker Compose and its benefits?

Docker Compose is a tool for defining and running multi-container Docker applications using a docker-compose.yml file.
Benefits:

Easier to define complex applications

Simple multi-container orchestration

Unified configuration for services, volumes, and networks
