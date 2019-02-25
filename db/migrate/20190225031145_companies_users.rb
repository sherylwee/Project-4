class CompaniesUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :companies_users do |t|
      t.references :company
      t.references :user
      t.timestamps
    end

  end
end
