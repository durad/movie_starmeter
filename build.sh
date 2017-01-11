#!/bin/bash

concurrently --prefix "name" \
    --names "cine_list,cine_movi,imdb_movi,livereloa" \
    --prefix-colors "green,green,green,gray" \
    "tsc -w --pretty -p src/cineplex_list/tsconfig.json" \
    "tsc -w --pretty -p src/cineplex_movie/tsconfig.json" \
    "tsc -w --pretty -p src/imdb_movie/tsconfig.json" \
    "cd release && livereload"
