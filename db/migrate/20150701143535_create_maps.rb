class CreateMaps < ActiveRecord::Migration
  def change
    create_table :maps do |t|
      t.json :map_data

      t.timestamps
    end
  end
end
