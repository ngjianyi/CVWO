class CreateForumComments < ActiveRecord::Migration[7.1]
  def change
    create_table :forum_comments do |t|
      t.text :content, null: false
      t.string :author, null: false
      t.belongs_to :forum_thread, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
