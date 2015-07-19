class SearchController < ApplicationController
    def search
        @visibility = "hidden"
        if params[:search]
            @visibility = "visible"
            @maps = Map.search(params[:search]).order("created_at DESC");
        end
    end
end
