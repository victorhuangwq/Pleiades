class CreateMaps < ActiveRecord::Migration
  def change
    create_table :maps do |t|
      t.string :map_data

      t.timestamps
    end
  end
end
