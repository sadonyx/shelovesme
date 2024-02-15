require 'sinatra'
require 'tilt/erubis'
require 'sinatra/reloader'
require 'json'

configure do
  enable :sessions
  set :environment, :development
  set :session_secret, SecureRandom.hex(32)
  set :erb, :escape_html => true
  set :public_folder, __dir__ + '/public'
  set :port, 9090
  set :server, :puma
  set :server_settings, :Threads => '0:16', :Verbose => true
end

before "/" do
  initialize_game
end

get "/" do
  initialize_variables

  erb :game
end

before "/change-face" do
  @range = session[:range]
  @love = session[:love]
  @face_image = session[:face_image]
  session[:count_down] -= 1
  session[:game_over] = game_over?
end

get "/change-face" do
  @count_down = session[:count_down]
  @game_over = session[:game_over]
  load_button = nil

  toggle_love
  changes = change_face

  if @count_down == 0
    load_button = (erb :_play_again_partial, :layout => false)
  end

  content_type :json
  {
    faceImage: changes[:face_image],
    textImage: changes[:text_image],
    favIcon: changes[:fav_icon],
    delay: changes[:delay],
    isWinner: changes[:is_winner],
    partial: load_button
  }.to_json
end

before "/play-again" do
  initialize_game
end

get "/play-again" do
  initialize_variables

  erb :_flower_partial, :layout => false, :locals => { :field_list => @field_list }
end

def initialize_game
  session[:range] = random_range(7, 16)
  session[:love] = true
  session[:face_image] = "normal-face.png"
  session[:count_down] = session[:range]
  session[:game_over] = false
end

def initialize_variables
  @range = session[:range]
  @love = session[:love]
  @face_image = session[:face_image]
  @field_list = generate_petals
  @game_over = session[:game_over]
end

def game_over?
  @count_down == 0
end

def toggle_love
  session[:love] = !session[:love]
end

def change_face
  face_name = ''
  text_name = ''
  delay = false
  is_winner = nil

  if @love == true && @count_down >= 1
    face_name = "loves-me-face"
    text_name = "loves-me-text"
  elsif @love == false && @count_down >= 1
    face_name = "loves-me-not-face"
    text_name = "loves-me-not-text"
  elsif @love == true && @count_down == 0
    delay = true
    is_winner = true
    face_name = "really-loves-me-face"
    text_name = "really-loves-me-text"
    # setFinalVerdict("Really Loves Me")
  elsif @love == false && @count_down == 0
    delay = true
    is_winner = false
    face_name = "really-loves-me-not-face"
    text_name = "really-loves-me-not-text"
    # setFinalVerdict("Really Loves Me")
  end

  {
    face_image: "/images/assets/faces/#{face_name}.png",
    text_image: "/images/assets/text/#{text_name}.png",
    fav_icon: face_name + '.ico',
    delay: delay,
    is_winner: is_winner
  }
end

def generate_petals


  width = 450
  height = 425
  radius = 78

  num_of_petals = @range
  step = (2 * Math::PI) / num_of_petals
  field_list = []
  angle = 0
  orientation = 90;

  (0..num_of_petals - 1).each do |i|
    x = (width / 2 + radius * Math.cos(angle)).round
    y = (height / 2 + radius * Math.sin(angle)).round

    field_list.push({
      x: x,
      y: y,
      orientation: orientation.round(),
      id: "petal#{i}",
    })

    angle += step;
    orientation += 360 / num_of_petals
  end

  return field_list
end

def random_range(min, max)
  (rand * (max - min) + min).floor
end

helpers do
  def partial(template, locals = {})
    erb template, :layout => false, :locals => locals
  end
end 

