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
        nums = []
        for map in maps
            num = map.num_matched(stags)
            nums << num
        end
        maps, nums = mergesort(maps, nums)
        maps
    end

    def self.mergesort(smaps, nums)
        if smaps.length <= 1
            return smaps, nums
        end

        mid = smaps.length / 2
        part_a1, part_a2 = mergesort smaps.slice(0, mid), nums.slice(0, mid)
        part_b1, part_b2 = mergesort smaps.slice(mid, smaps.length - mid), nums.slice(mid, smaps.length - mid)

        maparray = []
        numarray = []

        offset_a = 0
        offset_b = 0

        while offset_a < part_a1.count && offset_b < part_b1.count
            a = part_a2[offset_a]
            b = part_b2[offset_b]

            if (a >= b)
                numarray << a
                maparray << part_a1[offset_a]
                offset_a += 1
            else
                numarray << b
                maparray << part_b1[offset_b]
                offset_b += 1
            end
        end

        while offset_a < part_a1.count
            maparray << part_a1[offset_a]
            numarray << part_a2[offset_a]
            offset_a += 1
        end
        while offset_b < part_b1.count
            maparray << part_b1[offset_b]
            numarray << part_b2[offset_b]
            offset_b += 1
        end

        return maparray, numarray
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
      Tag.find_by_name!(name).maps
    end

end
