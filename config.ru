#\ -s puma -o 127.0.0.1 -p 9090 -O Threads=0:16 -O Verbose

require 'sinatra/base'
require "./love.rb"
run SheLovesMe