class Group < ApplicationRecord
  validates :title,
            presence: true,
            length: {
              minimum: 3,
              maximum: 15
            },
            uniqueness: {
              case_sensitive: false
            }
  has_many :user_groups
  has_many :users, through: :user_groups
end
