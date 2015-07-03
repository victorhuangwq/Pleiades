class AddShortenLinkColumn < ActiveRecord::Migration
  def change
    add_column :maps, :shortURL, :string
  end
end
