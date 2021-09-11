/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

import fetchMock from "fetch-mock";
import { generateToken } from "../src/index.js";
import { TOMORROW } from "../../../scripts/test-helpers.js";

const TOKEN_URL = "https://www.arcgis.com/sharing/rest/generateToken";

describe("generateToken()", () => {
  afterEach(fetchMock.restore);

  it("should generate a token for a username and password", (done) => {
    fetchMock.postOnce(TOKEN_URL, {
      token: "token",
      expires: TOMORROW.getTime()
    });

    generateToken(TOKEN_URL, {
      params: {
        username: "Casey",
        password: "Jones"
      }
    })
      .then((response) => {
        const [url, options]: [string, RequestInit] =
          fetchMock.lastCall(TOKEN_URL);
        expect(url).toEqual(TOKEN_URL);
        expect(options.body).toContain("f=json");
        expect(options.body).toContain("username=Casey");
        expect(options.body).toContain("password=Jones");
        expect(response.token).toEqual("token");
        expect(response.expires).toEqual(TOMORROW.getTime());
        done();
      })
      .catch((e) => {
        fail(e);
      });
  });
});
