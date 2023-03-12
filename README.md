## About

zkSync CLI built on **Open CLI Framework** (oclif) for better organization, extensibility and maintainability with tests. 

_oclif_ is widely used by Heroku and Shopify. 

The objective is to cover zksync-web3 APIs extensively with more commands.

### Demo video

### To run

clone this repository and get into the project folder.

`npm install` to install necessary dependencies

`./bin/dev --help` to see a list of commands available

![all the commands](/docs/all-commands.png)

`./bin/dev create --help` use `--help` flag to get more info about each command

![learn about each command](/docs/each-command.png)

### Objectives

**#1 Structure the project for extensibility and maintainability**

The project is refactored to use `oclif` for easy addition and organization of commands.

To add a command `oclif generate command [command-name]` there is no need to update central index file.

Test needs to be written in `test/` folder for each command.

**#2 Usability**

Upon calling each command, params are entered via interactive prompts. 

Optional flags based inputs can be considered for progammability and to skip prompts.

Each command has helpful description about what it does and how to use it.

`--help` is just an enter away. Don't worry about typos anymore with helpful prompt.

**#3 Functionality**

Initial 3 commands are quadrapled to 12 commands.

With more commands to be added.
