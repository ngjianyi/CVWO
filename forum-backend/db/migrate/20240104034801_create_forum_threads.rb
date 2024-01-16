class CreateForumThreads < ActiveRecord::Migration[7.1]
  def change
    create_table :forum_threads do |t|
      t.string :title, null: false
      t.text :content, null: false
      
      t.timestamps
    end
  end
end
