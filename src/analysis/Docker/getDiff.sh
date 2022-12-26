#!/bin/sh

cd repos/$1 &&\
  git --no-pager diff --histogram $2 $3 -- test
