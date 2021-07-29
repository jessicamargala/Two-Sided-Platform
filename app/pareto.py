
items = [9,9,9,9]
user_pref = [5,3,2,1]
agent_pref = [5,1,2,3]

user_points = []
agent_points = []
for i in range(10):
	for j in range(10):
		for a in range(10):
			for b in range(10):
				user_points.append(user_pref[0]*i+user_pref[1]*j+user_pref[2]*a+user_pref[3]*b)
				agent_points.append(agent_pref[0]*(9-i)+agent_pref[1]*(9-j)+agent_pref[2]*(9-a)+agent_pref[3]*(9-b))

user_set = set(user_points)
set_points = list(user_set)
set_points.sort(reverse=True)

print("user points: ", set_points)
print(list(user_set))
print("test")
agent_points.sort()
agent_set = set(agent_points)
print(list(agent_set))
