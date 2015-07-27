class Tagging < ActiveRecord::Base
  belongs_to :map
  belongs_to :tag
end
