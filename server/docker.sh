# running new docker image command :
docker run --name cassandra -d -p 9042:9042 cassandra:latest

# checking container status :
docker logs -f cassandra

# to enter cassandra shell (for database management) :
docker exec -it cassandra cqlsh

