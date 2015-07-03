class ViewController < ApplicationController
  def view
    @mapid = params[:mapid]
    @map = Map.find_by(id: @mapid)
    @map_data = @map.map_data.to_json
  end
end
