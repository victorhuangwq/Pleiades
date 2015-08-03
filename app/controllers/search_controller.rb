class SearchController < ApplicationController
    def search
        @visibility = "hidden"
        if params[:search]
            @visibility = "visible"
            @maps = Map.search(params[:search], params[:tags]);
        else
            @dummy = Map.create title: ""
            @maps = [[@dummy, 0]]
        end
    end
end
