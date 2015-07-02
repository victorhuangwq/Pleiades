class ChangeTypeOfMapDataToJson < ActiveRecord::Migration
  def change
      change_column :maps, :map_data, 'json USING CAST(map_data AS json)', :limit => nil
  end
end
