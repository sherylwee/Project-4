class Company < ApplicationRecord
    has_one :client
    has_many :item
end
