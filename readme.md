#Create User Model

- npx sequelize-cli model:generate --name Date --attributes date:date,createdBy:integer,updatedBy:integer,isDeleted:boolean
  #Migrate DB
- npx sequelize-cli db:migrate
- npx sequelize-cli db:migrate --to 20220504100251-create-user.js
- #Create User Seed Database
- npx sequelize-cli seed:generate --name user
- npx sequelize-cli db:seed:all
- npx sequelize-cli db:seed --seed 20220801080157-org.js

#Undo!!!!

- npx sequelize-cli db:migrate:undo:all
- npx sequelize-cli db:seed:undo:all
