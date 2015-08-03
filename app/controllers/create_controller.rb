class CreateController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def create
    @introTrue = params[:introTrue]
    if @introTrue.blank?
      @introTrue = false
    end
  end
  def submit
    @map_data = params[:map_data]
    @title = params[:title]
    @names = params[:tags]
    @m = Map.create map_data: @map_data, title: @title
    @m.all_tags = @names
    @mid = @m.id

    client = Bitly.client
    @url = client.shorten("http://pleiadesorbital.herokuapp.com/view/view?mapid="+String(@mid))
    @m.shortURL = @url.short_url
    @m.save
  end
end
