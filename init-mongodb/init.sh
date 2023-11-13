#!/bin/bash
echo "########### Loading data to Mongo DB ###########"
mongoimport --jsonArray --db bootcampDb --collection users --file /tmp/data/users.json