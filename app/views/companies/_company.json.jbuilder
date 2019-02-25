json.extract! company, :id, :name, :contact, :location, :description, :created_at, :updated_at
json.url company_url(company, format: :json)
