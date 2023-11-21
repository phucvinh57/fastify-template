# Changelog

## [1.7.0](https://github.com/phucvinh57/fastify-template/compare/v1.6.1...v1.7.0) (2023-11-21)


### Features

* **logger:** integrate with discord webhook ([260e991](https://github.com/phucvinh57/fastify-template/commit/260e991b8ba1d1302125d78f98e6b1a6f7b447c7))


### Performance Improvements

* **request:** decorate user object for each request ([30e6fdb](https://github.com/phucvinh57/fastify-template/commit/30e6fdb655a56e068f6edc89fff329db71bfc09d))

## [1.6.1](https://github.com/phucvinh57/fastify-template/compare/v1.6.0...v1.6.1) (2023-09-18)


### Bug Fixes

* **build product:** incorrect entry file path ([aa16608](https://github.com/phucvinh57/fastify-template/commit/aa16608bf7f2f18563ce793a5383693ed7b88901)), closes [#50](https://github.com/phucvinh57/fastify-template/issues/50)
* **index.ts:** calling wrong method to start application ([c2ededa](https://github.com/phucvinh57/fastify-template/commit/c2ededa470cdbdd6eabec983773b85fccfed4964))
* **project config:** missing linting & testing config ([289ea6a](https://github.com/phucvinh57/fastify-template/commit/289ea6af953ee147f65ceef378ddb330e976b177))

## [1.6.0](https://github.com/phucvinh57/fastify-template/compare/v1.5.0...v1.6.0) (2023-08-22)


### Features

* **dtos:** migrate from `fluent-json-schema` to `@sinclair/typebox` ([ab84294](https://github.com/phucvinh57/fastify-template/commit/ab84294906cb022d185164e91f07e872ff881029))
* **error handler:** catch more cases ([c746a39](https://github.com/phucvinh57/fastify-template/commit/c746a398788665c0be701a7daa81c9f3c595d85e))

## [1.5.0](https://github.com/phucvinh57/fastify-template/compare/v1.4.0...v1.5.0) (2023-08-07)


### Features

* update template structures & code quality ([114ed2e](https://github.com/phucvinh57/fastify-template/commit/114ed2ec65f5006ead6758e56d0b869211d943ee))

## [1.4.0](https://github.com/phucvinh57/fastify-template/compare/v1.3.0...v1.4.0) (2023-06-07)


### Features

* **envs:** add validations using `envalid` ([4cfff3e](https://github.com/phucvinh57/fastify-template/commit/4cfff3eeb0b5e77a8d0c8ec460a3164e1a56c158))

## [1.3.0](https://github.com/phucvinh57/fastify-template/compare/v1.2.4...v1.3.0) (2023-05-23)


### Features

* **request:** write custom type for authenticated request ([9340448](https://github.com/phucvinh57/fastify-template/commit/93404484bc99fd679eec7089ce4c2cf74f946e02))


### Bug Fixes

* **routes:** disable exposing HEAD route for each GET method ([5825529](https://github.com/phucvinh57/fastify-template/commit/5825529ee30acfeb18504ea32a128098480b31b8))

## [1.2.4](https://github.com/phucvinh57/fastify-template/compare/v1.2.3...v1.2.4) (2023-05-20)


### Bug Fixes

* **release.yml:** good fix ([ca14e0f](https://github.com/phucvinh57/fastify-template/commit/ca14e0f2a8489f5c6ff70d9518862a193714da9c))

## [1.2.3](https://github.com/phucvinh57/fastify-template/compare/v1.2.2...v1.2.3) (2023-05-20)


### Bug Fixes

* **release.yml:** fuking shit ([6e70795](https://github.com/phucvinh57/fastify-template/commit/6e70795d971c66467b435441045bcb209ca312b0))

## [1.2.2](https://github.com/phucvinh57/fastify-template/compare/v1.2.1...v1.2.2) (2023-05-20)


### Bug Fixes

* **ci:** remove print release step outputs ([a1c7bb4](https://github.com/phucvinh57/fastify-template/commit/a1c7bb40424df6e5265d13f1fc5dbd7d4929fdc7))

## [1.2.1](https://github.com/phucvinh57/fastify-template/compare/v1.2.0...v1.2.1) (2023-05-20)


### Bug Fixes

* github actions cannot read `release` job's outputs ([7264e4f](https://github.com/phucvinh57/fastify-template/commit/7264e4f2b6108da4d29c257db3462ebb47d994f9))

## [1.2.0](https://github.com/phucvinh57/fastify-template/compare/v1.1.0...v1.2.0) (2023-05-20)


### Features

* **ci:** adapt new ci workflows ([89ec5dc](https://github.com/phucvinh57/fastify-template/commit/89ec5dc4ae68bf9575cff6cb62d929e499a4056d))

## [1.1.0](https://github.com/phucvinh57/fastify-template/compare/v1.0.1...v1.1.0) (2023-05-20)


### Features

* add bot's PR header ([062e6ec](https://github.com/phucvinh57/fastify-template/commit/062e6ec4894483b7557e0bfc32fe9bf10e3272c3))

## [1.0.1](https://github.com/phucvinh57/fastify-template/compare/v1.0.0...v1.0.1) (2023-05-20)


### Bug Fixes

* **dependabot.yml:** disable version updates for npm dependencies ([a003e1a](https://github.com/phucvinh57/fastify-template/commit/a003e1a6db73adfc606eda32a1cb67b63eaab817))

## 1.0.0 (2023-05-20)


### Features

* manage tags and versions ([fd15413](https://github.com/phucvinh57/fastify-template/commit/fd154137c167922ca3dc9e00ae4c2f745a782379))


### Bug Fixes

* **dependabot.yml:** wrong configuration ([5707c12](https://github.com/phucvinh57/fastify-template/commit/5707c120c9dffae829732b9b8f52cd4ae222320f))
* **dependabot:** change target branch ([54e4384](https://github.com/phucvinh57/fastify-template/commit/54e43843700446aaaf0ccd6c3607b0d2ec9eb85f))
* **dependabot:** set target branch direct to master ([f3a0ab9](https://github.com/phucvinh57/fastify-template/commit/f3a0ab9d4885882a6df0891dfce4d9d2d1b502aa))
* **swagger:** update to openapi 3 ([c3197f9](https://github.com/phucvinh57/fastify-template/commit/c3197f9e4c82b945838603154e312778c5443e8d))
