from django.conf.urls import url, include
from django.contrib import admin
from django.urls import path
# from to_do.urls import router as to_do_router
# from user.urls import router as user_router

from seat.urls import router as seat_router
from keiba.urls import router as keiba_router

# from mysite.django_app.seat.views import SeatViewSet
from mysite.django_app.webscraping import views as webscraping_views
from mysite.django_app.racelist import views as racelist_views
from mysite.django_app.seat_module import views as seat_module_views
from mysite.django_app.race import views as race_views
# from mysite.django_app.seat import views as seat_views


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    # url(r'^api/', include(to_do_router.urls)),
    # url(r'^api/', include(user_router.urls)),
    # Webscraping実行API呼び出し
    path('api/webscraping/execute/', webscraping_views.executeMainWebScraping, name='executeMainWebScraping'),
    # Jockeyscraping実行API呼び出し
    path('api/jockeyscraping/execute/', webscraping_views.executeJockeyScraping, name='executeJockeyScraping'),
    # 日付で指定したレース一覧を取得する
    path('api/racelist/retrieve/', racelist_views.retrieveRaceList, name='retrieveRaceList'),
    # URLで指定したレース一覧を取得する
    path('api/race/retrieve/', race_views.retrieveRace, name='retrieveRace'),
    # 競馬のテストコード
    url(r'^api/keiba/', include(keiba_router.urls)),
    # URLで指定したレース一覧を取得する
    path('api/race/retrieve/', race_views.retrieveRace, name='retrieveRace'),

    # 座席関係のサービス
    path('api/seat_module/retrieveAllSeat/', seat_module_views.retrieveSeat, name='retrieveSeat'),
    # 座席一覧を取得する
    url(r'^api/seat/', include(seat_router.urls)),

    # ボツ
    # url(r'^api/webscraping/', include(webscraping_router.urls)),

]

