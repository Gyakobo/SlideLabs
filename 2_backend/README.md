#Install

##Setup python environment

* Install python3.8

```bash
sudo apt-get update

sudo apt-get install software-properties-common

sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt-get update

sudo apt-get install python3-pip (not sure if this nessesary)
sudo apt-get install python3.8
sudo apt-get install python3.8-venv
```



* Create virtual enviroment:
```bash
python3.8 -m venv venv
```
* Activate environment
```bash
source venv/bin/activate
```
* Install requirements:
```bash
pip install --upgrade pip && pip install -r requirements.txt
```

## MongoDB

```mongo
use admin
db.createUser(
  {
    user: "admin",
    pwd: "admin",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
```

```bash
sudo service mongod restart
```

##Nginx

* Run setup_nginx script 
```bash
cd aa_scripts
sudo chmod a+x setup_nginx.sh
sudo ./setup_nginx.sh
```

## Setup ftp on server

```bash
sudo apt-get install openssh-server
```