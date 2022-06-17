class CreateGroup < ActiveRecord::Migration[6.1]
  def change
    create_table :groups do |t|
      t.string :title
      t.string :description
      t.boolean :is_group , default: false
      t.timestamps
    end
    create_table :user_groups do |t|
      t.integer :user_id
      t.integer :group_id
      t.timestamps
    end
    add_column :messages, :group_id, :int
  end
end
