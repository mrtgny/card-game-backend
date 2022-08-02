# Installation
- Make sure the ports "4000" and "5435" are available on your end!
```
docker-compose up -d --build
```

# Address
The app will be running at 
```
http://localhost:4000
```

# Running Tests
```
docker exec -it card-game-backend /bin/sh -c "npm test"
```

# Clean
```
docker-compose down --remove-orphans --rmi "local" --volumes;
```