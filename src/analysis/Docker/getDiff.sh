#!/bin/sh

cd repos/$1 &&\
  git diff --histogram $2 $3 -- test