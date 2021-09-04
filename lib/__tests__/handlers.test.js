const { expect, jest } = require("@jest/globals");
const handlers = require("../handlers");

test("Home page is loading", () => {
  const req = {};
  const res = { render: jest.fn() };
  handlers.home(req, res);
  expect(res.render.mock.calls[0][0]).toBe("home");
});

test("Page is loaded with random fortune phrase", () => {
  const req = {};
  const res = { render: jest.fn() };
  handlers.home(req, res);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe("home");
  expect(res.render.mock.calls[0][1]).toEqual(
    expect.objectContaining({
      fortune: expect.stringMatchin(/\W/),
    })
  );
});

test("404 error handling is rendering", () => {
  const req = {};
  const res = { render: jest.fn() };
  handlers.notFound(req, res);
  expect(res.render.mock.calls.length).toBe[1];
  expect(res.render.mock.calls[0][0]).toBe("404");
});

test("500 error handling is rendering", () => {
  const err = new Error("ERROR");
  const req = {};
  const res = { render: jest.fn() };
  const next = jest.fn();
  handlers.serverError(err, req, res, next);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe("500");
});
