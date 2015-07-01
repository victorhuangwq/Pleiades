class CreateController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def create
  end
  def submit
    @map_data = params[:map_data]
    @m = Map.create map_data: @map_data
    @mid = @m.id
  end
end
