class Map < ActiveRecord::Base

    has_many :taggings
    has_many :tags, through: :taggings

    def all_tags=(names)
        self.tags = names.split(",").map do |name|
            Tag.where(name: name.strip).first_or_create!
        end
    end

    def all_tags
        self.tags.map(&:name).join(", ")
    end

    def self.search(query, stags)
        maps = where("title like ?", "%#{query}%")
        arr = []
        for map in maps
            num = map.num_matched(stags)
            arr << [map, num]
        end
        arr.sort_by{ |map, num| num }.reverse!
    end

    def num_matched(stags)
        count = 0
        names = stags.split(",")
        for name in names
            if self.tagged_with(name.strip)
                count = count + 1
            end
        end
        count
    end

    def tagged_with(name)
      Tag.find_by_name!(name).maps.include? self
    end

end
