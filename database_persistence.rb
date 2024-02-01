require "pg"

class DatabasePersistence
  def initialize(logger)
    @db = if Sinatra::Base.production?
        PG.connect(dbname: 'shelovesme')
      else
        PG.connect(dbname: 'shelovesme')
      end
    @logger = logger
  end
end