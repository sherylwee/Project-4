# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

company_list = [
    {name: "CompanyOi", contact: 67775544, location: "Tampines", description: "We sell ovens", client_id: 1},
    {name: "CompanyYo", contact: 68807755, location: "Outram", description: "We sell yo-yos", client_id: 2},
    {name: "CompanyHey", contact: 69981122, location: "Changi", description: "We sell our hearts", client_id: 3},
    {name: "CompanyWoah", contact: 63456789, location: "Jurong", description: "We sell everything", client_id: 4}
]

def create_company(list)
    list.each.do |item|
    Company.create(name: item[:name], contact: item[:contact, location: item[:location], description: item[:description])
end
end

create_company(company_list)

user_list = [
    {name: "Bob", contact: 98767890, email: "bob@mail.com", student_id: 1},
    {name: "Mike", contact: 89756558, email: "mike@mail.com", student_id: 2},
    {name: "Colin", contact: 96687665, email: "cols90@mail.com", student_id: 3},
    {name: "Fred", contact: 98439766, email: "fred@mail.com", student_id: 4}
]

def create_user(list)
    list.each.do |item|
    User.create(name: item[:name], contact: item[:contact], email: item[:email])
end 
end

create_user(user_list)