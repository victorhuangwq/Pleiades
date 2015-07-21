class SearchController < ApplicationController
    def search
        @visibility = "hidden"
        if params[:search]
            @visibility = "visible"
            @maps = Map.search(params[:search]).order("created_at DESC");
        else
            @dummy = Map.create title: ""
            @maps = [@dummy]
        end
    end
end
