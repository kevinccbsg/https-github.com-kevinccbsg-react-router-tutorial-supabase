create policy "Enable delete for users based on profile_id"
on "public"."contacts"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = profile_id));


create policy "Enable insert for users based on profile_id"
on "public"."contacts"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = profile_id));


create policy "Enable update for users based on profile_id"
on "public"."contacts"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = profile_id));


create policy "Enable users to view their own data only"
on "public"."contacts"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = profile_id));




