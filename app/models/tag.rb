class Tag < ActiveRecord::Base
    has_many :taggings
    has_many :maps, through: :taggings
end
