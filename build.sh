#!/bin/bash

concurrently --prefix "name" \
    --names "cine_list,cine_movi,imdb_movi" \
    "tsc -w --pretty -p src/cineplex_list/tsconfig.json" \
    "tsc -w --pretty -p src/cineplex_movie/tsconfig.json" \
    "tsc -w --pretty -p src/imdb_movie/tsconfig.json"
