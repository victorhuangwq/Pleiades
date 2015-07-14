class AddTitleToMaps < ActiveRecord::Migration
  def change
      add_column :maps, :title, :string
  end
end
