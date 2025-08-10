# [0.2.0](https://github.com/fa-biano/nest-url-shortener/compare/v0.1.0...v0.2.0) (2025-08-10)


### Features

* added AuthModule to AppModule ([8ad55c0](https://github.com/fa-biano/nest-url-shortener/commit/8ad55c0089fe2e65a7fc1c011a729ad905287f0b))
* added findUserByEmail method to UserService ([d612d4b](https://github.com/fa-biano/nest-url-shortener/commit/d612d4b60de6d8e990a840006c96b9db65d47ad0))
* added UseGuards to createShortUrl method ([d229e1b](https://github.com/fa-biano/nest-url-shortener/commit/d229e1b377b6f88405eee855af13f43d67bf1daf))
* added UserEntity relationship with UrlEntity ([6d66768](https://github.com/fa-biano/nest-url-shortener/commit/6d66768e62dcfeedbd2dd4421817b040604a7b2f))
* added UserModule to AppModule ([7c7b40e](https://github.com/fa-biano/nest-url-shortener/commit/7c7b40e2a1782ec283e44687ab9e277906fab072))
* added UserResponseDto to UserModule exports ([4d34069](https://github.com/fa-biano/nest-url-shortener/commit/4d34069aaee1d906a280c3fc84101567b5534c09))
* added UserService to exports list in UserModule ([0c48830](https://github.com/fa-biano/nest-url-shortener/commit/0c48830459cd7aea539cd4c9eb26b51827a7bca3))
* added ValidationPipe configs ([0a3101a](https://github.com/fa-biano/nest-url-shortener/commit/0a3101abd4869db35d480409b4957c8b066465b8))
* create JwtPayload interface ([b234cee](https://github.com/fa-biano/nest-url-shortener/commit/b234cee3810545c48c6137539459e5b66289adcd))
* created AuthController ([e47cf26](https://github.com/fa-biano/nest-url-shortener/commit/e47cf26674e0d284df40c23679eeefd57957b358))
* created AuthModule ([b2df998](https://github.com/fa-biano/nest-url-shortener/commit/b2df998fbc906de977dd41562ed9634c161618b6))
* created AuthService ([633f81b](https://github.com/fa-biano/nest-url-shortener/commit/633f81b5b43596cf7ea364dce75dfeb6b3412b91))
* created CreateUserDto ([60d5884](https://github.com/fa-biano/nest-url-shortener/commit/60d58845e54cbf9ac31d33681c7b665aabad7a19))
* created custom decorator Public ([c3aee2c](https://github.com/fa-biano/nest-url-shortener/commit/c3aee2c555dd49acb3e51d1aa04d2e519af5d032))
* created JwtAuthGuard class ([3414b2b](https://github.com/fa-biano/nest-url-shortener/commit/3414b2b35e7026f484e1e219191d78633e1cc1ce))
* created JwtStrategy class ([f6fcba7](https://github.com/fa-biano/nest-url-shortener/commit/f6fcba7b303eda0a4f2b16ed47556e73025c8b18))
* created JwtStrategy class and validate validate method ([515cdc5](https://github.com/fa-biano/nest-url-shortener/commit/515cdc5d1cdd3cf9ff801263f73ddc8987f2e9af))
* created LoginDto ([81fdb02](https://github.com/fa-biano/nest-url-shortener/commit/81fdb027d1ed5f15cd17622602fc96d67be0467f))
* created OptionalJwtAuthGuard class ([57d76f4](https://github.com/fa-biano/nest-url-shortener/commit/57d76f446046057254c125b1c0f05dfbd51e4883))
* created UserController class with createUser and findUserById methods ([9a5d807](https://github.com/fa-biano/nest-url-shortener/commit/9a5d80762a899433ec39308a718e180544738482))
* created UserEntity ([48048ef](https://github.com/fa-biano/nest-url-shortener/commit/48048ef7a1ca9807dd62d033b5878035d6847c03))
* created UserIdDto ([b93d59a](https://github.com/fa-biano/nest-url-shortener/commit/b93d59aa87a4c7f9b27de87bf26107c26fbdc439))
* created UserModule ([96a20dc](https://github.com/fa-biano/nest-url-shortener/commit/96a20dcd6f0a395689c2249940d8653ca505ccda))
* created UserResponseDto ([c7d0733](https://github.com/fa-biano/nest-url-shortener/commit/c7d0733ea7836c58f9ebf5dd898261508797b71c))
* created UserService class with createUser and findUserById methods ([487d662](https://github.com/fa-biano/nest-url-shortener/commit/487d6621e1935bd5b7232f82a65511b395d09941))
* createShortUrl method will save user_id when provided ([c2d97c3](https://github.com/fa-biano/nest-url-shortener/commit/c2d97c34850280139a66c830f3761b0bc194a60f))
* install @nestjs/jwt @nestjs/passportpassport and passport-jwt ([628d0f7](https://github.com/fa-biano/nest-url-shortener/commit/628d0f7343ea7b819bff29866f0242629bf5b4e4))
* install bcrypt ([4263482](https://github.com/fa-biano/nest-url-shortener/commit/426348291dc86916262fa1d5dcf57fb8f818520d))



# [0.1.0](https://github.com/fa-biano/nest-url-shortener/compare/v0.0.2...v0.1.0) (2025-08-09)


### Bug Fixes

* preinstall script ([9bb4fec](https://github.com/fa-biano/nest-url-shortener/commit/9bb4fec0b85d7ea871717743823e7e91edc22f63))
* shortCode param dto validation in redirectToOriginalUrl method ([1aba4d6](https://github.com/fa-biano/nest-url-shortener/commit/1aba4d629766f8813af55dd3c74efcc63132fa4b))


### Features

* added call to incrementUrlAccessCounter in redirectToOriginalUrl method ([2c7096a](https://github.com/fa-biano/nest-url-shortener/commit/2c7096a2b756536b19d644bf481e4d02f7636b0a))
* added columns accessCounter, lastAccessAt and timestamps to UrlEntity ([10fea86](https://github.com/fa-biano/nest-url-shortener/commit/10fea865ea6af3450b0351e7c0bdc04b782f6488))
* added config for TypeOrmModule ([106c41a](https://github.com/fa-biano/nest-url-shortener/commit/106c41a391e333755909133320f4a3fb352e6d82))
* added ConfigModule and UrlModule to AppModule ([e835ecc](https://github.com/fa-biano/nest-url-shortener/commit/e835ecce27d0139738d135f3ae0df05387996bbd))
* added CreateUrlDto ([1308377](https://github.com/fa-biano/nest-url-shortener/commit/1308377939834587dcf3040ba4c8d88599419d34))
* added incrementUrlAccessCounter method to UrlService ([31e5feb](https://github.com/fa-biano/nest-url-shortener/commit/31e5feb95cafd493940e683bdc7c97c19049c9dd))
* added retriveOriginalUrl method to UrlService ([a21858b](https://github.com/fa-biano/nest-url-shortener/commit/a21858bbe4e14dbca654660f06045080bac49d85))
* added transform to ValidationPipe ([b35e98c](https://github.com/fa-biano/nest-url-shortener/commit/b35e98c8482f958c55b563c814e0792c5a74e01a))
* added type null to nullable Date Columns ([5d88521](https://github.com/fa-biano/nest-url-shortener/commit/5d885213d3f8f27998333b3386c7ad6ed5ad4c0c))
* added UrlController class and createShortUrl method ([e0a1aa7](https://github.com/fa-biano/nest-url-shortener/commit/e0a1aa7da30485cce3a2058b1efc45398e148b52))
* added UrlEntity ([e1ae696](https://github.com/fa-biano/nest-url-shortener/commit/e1ae6964ad0e49452c844684d9e2d6dba66778fe))
* added UrlModule ([5b0de90](https://github.com/fa-biano/nest-url-shortener/commit/5b0de9018e1033817e23bdbb05e275c43f0607c9))
* added UrlService and createShortUrl method ([b5c0364](https://github.com/fa-biano/nest-url-shortener/commit/b5c0364c3c17da0b4b87ed6d0bdd2e7ab5964ab8))
* added ValidationPipe to main ([28e2de9](https://github.com/fa-biano/nest-url-shortener/commit/28e2de9ff2040a3b4a83ac68c4f57c78b658d7bb))
* created CreateUrlDto ([b6ea6e9](https://github.com/fa-biano/nest-url-shortener/commit/b6ea6e9094fd570d667cce0745d0ded9aef2f5d4))
* created UrlShortCodeDto ([4fca726](https://github.com/fa-biano/nest-url-shortener/commit/4fca7264257c3f99defaa23521c5a8954af732da))
* implemented persistency to createShortUrl method in UrlService ([09d846d](https://github.com/fa-biano/nest-url-shortener/commit/09d846de616e843d8537a8acfb343d4b7ea81dc8))
* implemented redirectToOriginalUrl method to UrlController ([33a534a](https://github.com/fa-biano/nest-url-shortener/commit/33a534a5f7e6544f13f1889bab58392bfd8592dd))
* install @nestjs/config, class-validator and class-transformer ([7bd6a17](https://github.com/fa-biano/nest-url-shortener/commit/7bd6a174ee4c28f3b2164feb01844ea0f8d2032d))
* install @nestjs/typeorm, typeorm and pg ([34eb166](https://github.com/fa-biano/nest-url-shortener/commit/34eb166ff8d7108b0b809c5bf53ac7727e059a46))


### Performance Improvements

* refact createShortUrl to avoid infinite loop ([b521f40](https://github.com/fa-biano/nest-url-shortener/commit/b521f403f6edad018f6105747ffd6e5e50fef820))



## 0.0.2 (2025-08-07)



