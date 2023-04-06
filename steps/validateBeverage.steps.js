const { Given, Then, Before } = require("@cucumber/cucumber");
const { removeSync } = require("fs-extra");
const axios = require("axios");
var expect = require("expect");

const apiBaseUrl = "https://api.punkapi.com/v2/";
const headers = { "Content-Type": "application/json" };
let apiResponse;

Before(function () {
  removeSync("report/**"); //before hooks cleans report every test run
});

Given("I call the punk api with beer id {string}", async function (beerId) {
  try {
    apiResponse = await axios
      .get(`${apiBaseUrl}/beers/${beerId}`, { headers: headers })
      .then((response) => {
        return response;
      });
  } catch (err) {
    console.log(JSON.stringify(err));
    throw new err();
  }
});

Then("I expect a {int} status response", async function (statuscode) {
  await expect(apiResponse.status).toBe(statuscode);
  await expect(apiResponse.data).toHaveLength(1);
});

Then("The malt is {string}", async function (maltType) {
  await expect(apiResponse.data[0].ingredients.malt[0].name).toBe(maltType);
});

Then(
  "The malt value is {float} and the unit is {string}",
  async function (maltValue, measurementUnit) {
    await expect(apiResponse.data[0].ingredients.malt[0].amount.value).toBe(
      maltValue
    );
    await expect(apiResponse.data[0].ingredients.malt[0].amount.unit).toBe(
      measurementUnit
    );
  }
);
