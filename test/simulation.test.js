let WhatIs = artifacts.require("WhatIs");
let { catchRevert } = require("./exceptionsHelpers");
const { whatStruct, entryStruct, isDefined, isPayable, isType } = require("./astHelper");
const timeHelpers = require("./timeHelpers");

