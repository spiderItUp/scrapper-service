#!/bin/bash
docker image build -t alexisdoker/${1} .
docker image push alexisdoker/${1}
echo "all done"